import requests
from bs4 import BeautifulSoup
import redis
import json

def scrape_page_elements(url):
    import requests
    from bs4 import BeautifulSoup

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    print(soup.prettify())  # For debugging purposes, to see the HTML structure

    # Scrape the head element
    head = soup.head

    # Scrape the header element (a div with class 'bs-header')
    header = soup.find('div', class_='bs-header')

    response = {
        "head": str(head) if head else None,
        "header": str(header) if header else None,
    }
    return response

def store_in_redis(data):
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.set("scraped_content", json.dumps(data))

if __name__ == "__main__":
    url = "https://www.croma.com/televisions-accessories/c/997"
    page_elements = scrape_page_elements(url)
    store_in_redis(page_elements)