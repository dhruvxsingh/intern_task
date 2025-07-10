import requests
from bs4 import BeautifulSoup
import redis
import json


def scrape_page_elements(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    product_cards = soup.find_all('li', class_='product-item')
    products = []

    for card in product_cards:
        # Title
        title_tag = card.find("h3", class_="product-title")
        title = title_tag.get_text(strip=True) if title_tag else "No title"

        # New & Old Price
        new_price_tag = card.find("span", class_="plp-srp-new-amount")
        old_price_tag = card.find("span", attrs={"data-testid": "old-price"})
        new_price = new_price_tag.get_text(strip=True) if new_price_tag else "N/A"
        old_price = old_price_tag.get_text(strip=True) if old_price_tag else "N/A"

        # Discount
        discount_tag = card.find("span", class_="discount")
        discount = discount_tag.get_text(strip=True) if discount_tag else "N/A"

        # Save amount 
        save_tag = card.find("span", class_="dicount-value")
        save_amount = save_tag.get_text(strip=True) if save_tag else None

        # Extra Offer Tags
        tag_spans = card.find_all("span", class_="tagsForPlp")
        extra_tags = list(set([tag.get_text(strip=True) for tag in tag_spans]))

        # Product URL
        link_tag = title_tag.find("a") if title_tag else None
        product_url = "https://www.croma.com" + link_tag["href"] if link_tag and link_tag.has_attr("href") else None

        # Product ID 
        product_div = card.find("div", class_="cp-product")
        product_id = product_div.get("id") if product_div else None

        product = {
            "product_id": product_id,
            "title": title,
            "sale_price": new_price,
            "price": old_price,
            "discount_message": discount,
            "save_amount": save_amount,
            "extra_tags": extra_tags,
            "product_url": product_url,
            # These are loaded dynamically, so we can't scrape them with requests
            "rating": None,
            "review_count": None,
            "delivery_info": None,
            "image_url": None
        }

        products.append(product)

    print(f"Scraped {len(products)} products.")
    return products


def store_in_redis(data):
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.set("scraped_content", json.dumps(data))


if __name__ == "__main__":
    url = "https://www.croma.com/televisions-accessories/c/997"
    products = scrape_page_elements(url)
    store_in_redis(products)