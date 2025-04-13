import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;
  
    test.beforeEach (async ({page}) => { 
      widgetPage = new WidgetPage(page);

    // open uchi.ru main page
      await page.goto('https://uchi.ru'); //*1
      
      try {
    // close cookies popup
      await page.click('._UCHI_COOKIE__button');
      } catch (error) {
          console.warn("Cookie popup not found or could not be closed."); // Обрабатываем ошибку
      }
  });
  
  test('opens', async ({page}) => { 
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
    
  });

   test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    await page.waitForTimeout(2000); //*2

    const articles = await widgetPage.getPopularArticles();
    console.log("Articles:", articles);

    await articles[0].click();
     
    //await widgetPage.clickWriteToUs();

    await page.click('[class^=btnText__fCHf9]'); //*3

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');

  });

  test('displays popular articles', async ({ page }) => { // проверка отображаются ли статьи при открытии виджета 
    await widgetPage.openWidget();

    await page.waitForTimeout(2000); 

    const articles = await widgetPage.getPopularArticles();
    expect(articles.length).toBeGreaterThan(0); // Проверяем, что есть хотя бы одна статья

    // Проверяем, что первая статья видима
    await expect(articles[0]).toBeVisible();
  });

});
