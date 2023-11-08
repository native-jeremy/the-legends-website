window.onload = async () => {
  const TutorialName = document.getElementById("TutorialName");
  Wized.request.await("Load Tutorial", (response) => {
    const snapshot = response.data;
    let richTextRes = snapshot.Rich_Text;
    const richText = document.getElementById("richText");
    if (response.status == 200) {
      document.title = snapshot.Name;
      TutorialName.textContent = snapshot.Name;
      var converter = new showdown.Converter(),
        text = richTextRes,
        html = converter.makeHtml(text);
      richText.innerHTML = html;
    }
  });
  Wized.request.await("Load Exercise Tutorial", (response) => {
    const snapshot = response.data;
    TutorialName.textContent = snapshot.Exercise_Name;
    let richTextRes = snapshot.Tutorial_Description;
    const richText = document.getElementById("richText");
    console.log(response);
    if (response.status == 200) {
      document.title = snapshot.Exercise_Category[0];
      var converter = new showdown.Converter(),
        text = richTextRes,
        html = converter.makeHtml(text);
      richText.innerHTML = html;
    }
  });
};
