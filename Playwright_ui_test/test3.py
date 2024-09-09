from playwright.sync_api import sync_playwright

def test_add_very_long_task():
    with sync_playwright() as p:
        

        browser = p.chromium.launch(headless=False) 
        page = browser.new_page()

        page.goto('http://localhost:3001') 

  
        very_long_task = "task" * 50  

        task_input_selector = '#task'
        add_task_button_selector = 'input[type="submit"]'

        page.fill(task_input_selector, very_long_task)
        page.click(add_task_button_selector)
        print("Very long task added successfully.")

        task_list_selector = '.collection-item'
        tasks = page.locator(task_list_selector)
        
        last_task = tasks.first()

        assert last_task.text_content() == very_long_task, "Unsuccesful"
        print("The long task was added successfully.")

        browser.close()

if __name__ == "__main__":
    test_add_very_long_task()
