import { fetchData } from "./fetchData.js";

const renderGroups = async () => {
  const contents = await fetchData();

  const sectionContainer = document.body.querySelector("#groupsSection");
  sectionContainer.replaceChildren();

  if (!contents.length) {
    const noDataEl = document.createElement("h2");
    noDataEl.textContent = "No data in database";

    sectionContainer.append(noDataEl);
  }

  contents.forEach((dataFromDB) => {
    const { id, name } = dataFromDB;

    const contentContainer = document.createElement("div");
    contentContainer.className = "contentContainer";

    const titleContainer = document.createElement("div");
    titleContainer.className = "titleContainer";

    const idEl = document.createElement("h2");
    const nameEl = document.createElement("p");
    const contentEl = document.createElement("p");

    idEl.textContent = id;
    nameEl.textContent = "abc";
    contentEl.textContent = name;

    titleContainer.append(id, nameEl);

    contentContainer.append(titleContainer, name);

    sectionContainer.append(contentContainer);
  });
};

await renderGroups();
