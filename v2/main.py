from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Optional: Chrome driver path, adjust for your OS
service = Service(executable_path="/path/to/chromedriver")

# Launch browser
options = webdriver.ChromeOptions()
options.add_argument("--headless")  # comment this line if you want to see the browser
driver = webdriver.Chrome(service=service, options=options)

try:
    # 1. Open the leaderboard page
    driver.get("https://app.hyperliquid.xyz/leaderboard")
    time.sleep(5)  # wait for page to load (increase if needed)

    # 2. Locate the search input and enter the wallet address
    search_input = driver.find_element(By.XPATH, '//input[@placeholder="Search by wallet address..."]')
    wallet = "0xaa7577a7a27aa7fcf6d0ec481b87df3ad0f6a88e"
    search_input.send_keys(wallet)
    time.sleep(5)  # wait for search results to load

    # 3. Scrape the first row of the results table
    rows = driver.find_elements(By.XPATH, '//table//tbody//tr')
    if rows:
        for row in rows:
            cols = row.find_elements(By.TAG_NAME, 'td')
            values = [col.text for col in cols]
            print(values)
    else:
        print("No results found for wallet.")

finally:
    driver.quit()
