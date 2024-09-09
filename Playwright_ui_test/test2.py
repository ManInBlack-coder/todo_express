from playwright.sync_api import sync_playwright

def test_clear_all_tasks():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=False)  # Set headless=True for background execution
        page = browser.new_page()

        # Navigate to the page with the form
        page.goto('http://localhost:3001')  # Replace with your local server URL

        # Verify the presence of tasks before clearing
        task_list_selector = '.collection-item'
        tasks = page.locator(task_list_selector)
        
        # If no tasks are present, the test will exit early
        if tasks.count() == 0:
            print("No tasks found on the page to clear.")
            browser.close()
            return  # Exit early if no tasks are found

        print(f"Found {tasks.count()} task(s) to be cleared.")

        # Click the "Clear All" button
        clear_all_button_selector = 'form[action="/clear-tasks"] input[type="submit"]'
        page.click(clear_all_button_selector)
        print("Clear All button clicked.")

        # Wait for the task list to be cleared
        page.wait_for_selector(task_list_selector, state='detached')  # Wait for the tasks to disappear
        print("Waiting for tasks to be cleared...")

        # Verify that all tasks have been cleared
        if tasks.count() == 0:
            print("All tasks cleared successfully.")
        else:
            print("The tasks were not cleared successfully.")

        # Close the browser
        browser.close()

if __name__ == "__main__":
    test_clear_all_tasks()
