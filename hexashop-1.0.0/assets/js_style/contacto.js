document.addEventListener("DOMContentLoaded", () => {
  let button = document.getElementById("form-submit");
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      nombre: name.value,
      email: email.value,
      message: message.value,
    };
    dataArray = [data];
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FORMULARIO");
    XLSX.writeFile(workbook, "formulario.xlsx");
  });
});
