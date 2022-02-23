require("dotenv").config();
const axios = require("axios");

const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

const reqProps = {
  method: "POST",
  url: "https://api.notion.com/v1/pages",
  headers: {
    Accept: "application/json",
    "Notion-Version": "2021-08-16",
    "Content-Type": "application/json",
    // 'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${NOTION_KEY}`,
  },
  // mode: 'no-cors',
};

const page = {
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
};

function post() {
  if (!NOTION_KEY) {
    throw new Error("Integration Token not Informed!");
  }

  if (!NOTION_DB_ID) {
    throw new Error("Database ID not Informed!");
  }

  reqProps.data = page;

  axios
    .request(reqProps)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

post();
