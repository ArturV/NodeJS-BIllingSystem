import { fetchData } from "./fetchData.js";

const renderGroups = async () => {
  const contents = await fetchData();

  const sectionContainer = document.body.querySelector("#groupsSection");
  sectionContainer.replaceChildren();

  if (!contents.length) {
    const noDataEl = document.createElement("h4");
    noDataEl.textContent = "No data in database";

    sectionContainer.append(noDataEl);
  }

  contents.forEach((dataFromDB) => {
    const { id, name } = dataFromDB;

    const groupContainer = document.createElement("div");
    groupContainer.className = "groupContainer";
    groupContainer.style =
      " border: 1px solid #CECECE; border-radius: 5px; margin: 18px";

    const titleH4 = document.createElement("h4");
    const paragraph = document.createElement("p");
    paragraph.className = "groupName";

    titleH4.textContent = `ID: ${id}`;
    paragraph.textContent = name;

    groupContainer.append(titleH4, paragraph);
    sectionContainer.append(groupContainer);

    /*

    const titleContainer = document.createElement("div");
    titleContainer.className = "titleContainer";

    const idEl = document.createElement("h4");
    const nameEl = document.createElement("p");

    idEl.textContent = id;
    nameEl.textContent = name;

    titleContainer.append(id, nameEl);

    groupContainer.append(titleContainer, name);

    sectionContainer.append(groupContainer);
     */
  });
};

await renderGroups();
