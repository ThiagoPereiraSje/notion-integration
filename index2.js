require("dotenv").config();
const { Client } = require("@notionhq/client");

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

if (!NOTION_KEY) {
  throw new Error("Integration Token not Informed!");
}

if (!NOTION_DB_ID) {
  throw new Error("Database ID not Informed!");
}

const notion = new Client({ auth: NOTION_KEY });

(async () => {
  const response = await notion.pages.create({
    parent: {
      database_id: NOTION_DB_ID,
    },
    icon: {
      type: "emoji",
      emoji: "🎉",
    },
    cover: {
      type: "external",
      external: {
        url: "https://website.domain/images/image.png",
      },
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `Pedido ${Date.now()}`,
            },
          },
        ],
      },
      Tags: {
        multi_select: [
          {
            id: "e6ecab00-3ed3-4e76-85c3-0394b18c12cf",
            name: "Pendente",
            color: "red",
          },
        ],
      },
    },
    children: [
      {
        object: "block",
        type: "heading_2",
        heading_2: {
          text: [
            {
              type: "text",
              text: {
                content: "Lacinato kale",
              },
            },
          ],
        },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          text: [
            {
              type: "text",
              text: {
                content:
                  "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                link: {
                  url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                },
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
})();
