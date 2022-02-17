const { Client } = require("@notionhq/client");

const NOTION_KEY = "secret_UYrVLdUeAeFG1uSLoAKj5Kj9KIZvmAVrtz0DhyzakpF";
const NOTION_DB_ID = "c8523a07b8e24b34b40d52ed3d5f2132";

const notion = new Client({ auth: NOTION_KEY });

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
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

addItem("1 item no banco de dados");
