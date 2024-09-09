from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import requests
import pandas as pd
import time
import random
from datetime import datetime


def test_add_task():
    with sync_playwright() as p:

        browser = p.chromium.launch(headless=False)  
        page = browser.new_page()

        page.goto('http://localhost:3001')  

        task_input_selector = '#task'
        add_task_button_selector = 'input[type="submit"]'

        page.fill(task_input_selector, 'test Task')
        page.click(add_task_button_selector)

        task_list_selector = '.collection-item'
        new_task = page.locator(task_list_selector).last

        assert new_task.inner_text() != 'test task','The new task was not added successfully.'
        assert new_task.inner_text() == 'test task','Task adding was succesful'

        browser.close()

if __name__ == "__main__":
    test_add_task()