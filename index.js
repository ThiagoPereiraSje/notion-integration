const { Client } = require("@notionhq/client");
const dotenv = require("dotenv");

dotenv.config();
const NOTION_KEY = process.env.NOTION_KEY;
const NOTION_DB_ID = process.env.NOTION_DB_ID;

const notion = new Client({ auth: NOTION_KEY });

async function addItem(title, content) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        content: {
          rich_text: [
            {
              text: {
                content: content,
              },
            },
          ],
        },
      },
    });

    console.log(response);
    console.log("Entrada adicionada com sucesso!");
  } catch (error) {
    console.error(error.body);
  }
}

addItem("Novo Pedido", "Conteúdo do Pedido");
