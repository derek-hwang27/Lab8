import { expect } from "@jest/globals";

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
   
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });
  

  // test 2 is given
  
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);
  

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    const entry1 = await page.$("journal-entry");
    await entry1.click();

    await page.waitForNavigation();

    expect(page.url().includes("/#entry1")).toBe(true);

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    let myHeader = await page.$("h1");
    let innerText = await myHeader.getProperty("innerHTML");
    let propertyValue = await innerText.jsonValue();

    expect(propertyValue).toBe("Entry 1");

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    
    let eTitle = await page.$("entry-page");
    let eTitleData = await eTitle.getProperty("entry");
    let eTitleJSON = await eTitleData.jsonValue();

    let allContentCorrect = true;

    if (eTitleJSON.title != "You like jazz?") {
      allContentCorrect = false;
    }

    if (eTitleJSON.date != "4/25/2021") {
      allContentCorrect = false;
    }

    if (eTitleJSON.content != "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") {
      allContentCorrect = false;
    }

    if (eTitleJSON.image.src != "https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455") {
      allContentCorrect = false;
    }

    if (eTitleJSON.image.alt != "bee with sunglasses") {
      allContentCorrect = false;
    }

    expect(allContentCorrect).toBe(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let eBody = await page.$("body");
    let eBodyClassData = await eBody.getProperty("className");
    let eBodyClass = await eBodyClassData.jsonValue();

    expect(eBodyClass).toBe("single-entry");


  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

    const settings = await page.$("img");
    await settings.click();

    await page.waitForNavigation();

    expect(page.url().includes("/#settings")).toBe(true);

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    let sHeader = await page.$("h1");
    let sHeaderData = await sHeader.getProperty("innerHTML");
    let sHeaderJSON = await sHeaderData.jsonValue();

    expect(sHeaderJSON).toBe("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let sBody = await page.$("body");
    let sBodyClassData = await sBody.getProperty("className");
    let sBodyClass = await sBodyClassData.jsonValue();

    expect(sBodyClass).toBe("settings");
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();

    //await page.waitForNavigation();

    expect(page.url().includes("/#entry1")).toBe(true);


  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it ("Test11: Clicking back, URL should be home", async() => {
    await page.goBack();

    expect(page.url()).toBe('http://127.0.0.1:5500/')
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it ("Test12: Homepage? Title is Journal Entries", async() => {
    let hHeader = await page.$("h1");
    let hHeaderData = await hHeader.getProperty("innerHTML");
    let hHeaderJSON = await hHeaderData.jsonValue();

    expect(hHeaderJSON).toBe("Journal Entries");
  })

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On Home page - checking <body> element classes', async () => {
    let hBody = await page.$("body");
    let hBodyClassData = await hBody.getProperty("className");
    let hBodyClass = await hBodyClassData.jsonValue();

    expect(hBodyClass).toBe("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Clicking second <journal-entry>, new URL should contain /#entry2', async () => {
    const entry2 = await page.$$("journal-entry");
    await entry2[1].click();

    await page.waitForNavigation();

    expect(page.url().includes("/#entry2")).toBe(true);

  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: On Entry2 page - checking page header title', async () => {
    let eHeader = await page.$("h1");
    let eHeaderData = await eHeader.getProperty("innerHTML");
    let eHeaderJSON = await eHeaderData.jsonValue();

    expect(eHeaderJSON).toBe("Entry 2");

  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Entry2 Content', async () => {
    

  });

  // create your own test 17
  it ("Test17: Clicking back, URL should be home", async() => {
    await page.goBack();

    expect(page.url()).toBe('http://127.0.0.1:5500/')
  });

  // create your own test 18
  it('Test18: Clicking third <journal-entry>, new URL should contain /#entry3', async () => {
    const entry2 = await page.$$("journal-entry");
    await entry2[2].click();

    await page.waitForNavigation();

    expect(page.url().includes("/#entry3")).toBe(true);

  });

  // create your own test 19
  it('Test19: On Entry3 page - checking page header title', async () => {
    let eHeader = await page.$("h1");
    let eHeaderData = await eHeader.getProperty("innerHTML");
    let eHeaderJSON = await eHeaderData.jsonValue();

    expect(eHeaderJSON).toBe("Entry 3");

  });
  // create your own test 20
  it ("Test20: Clicking back, URL should be home", async() => {
    await page.goBack();

    expect(page.url()).toBe('http://127.0.0.1:5500/')
  });

});
