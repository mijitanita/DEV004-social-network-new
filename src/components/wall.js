import { post, getPost, deletePosta, editPost } from "../Firebase/authentication";
import { onNavigate } from "../router.js";
import buttonEditIconImg from '../imagenes/buttonEditIcon.png';
import buttonDeleteIconImg from '../imagenes/eliminar.png'
import buttonxIconImg from "../imagenes/x.png";
import logo2Img from '../imagenes/logo.png';
import fondoImg from '../imagenes/fondo-cel.png';
import likeEmptyIconImg from "../imagenes/likeVacio.png";
import likeFullIconImg from "../imagenes/likeLleno.png";


export const wall = () => {
  const buttonSend = document.createElement("btn");
  const inputShowModal = document.createElement("textarea");
  const div = document.createElement("div");
  const dialog = document.createElement("dialog");
  const buttonxIcon = document.createElement("img", "btn");
  const taskContainer = document.createElement("div");
  const imgUser = document.createElement("img");
  const logo2 = document.createElement("img");
  const fondo = document.createElement("img");
  const likeEmptyIcon = document.createElement("img", "input");
  const likeFullIcon = document.createElement("img", "input");
  const buttonSingOff = document.createElement("btn");
  let inputPost = document.createElement("input");

  inputShowModal.placeholder = "¿ Qué estás pensando ... ?";
  inputPost.placeholder = "¿ Qué estás pensando ... ?";

  inputPost.type = "texto";
  imgUser.type = "img";
  buttonxIcon.type = "btn";
 

  fondo.id = "fondo";
  div.id = "section";
  logo2.id = "logo2";
  dialog.id = "dialog";
  inputShowModal.id = "ShowModal";
  inputPost.id = "post";
  imgUser.id = "imgUser";
  taskContainer.id = "taskContainer";

  buttonSend.textContent = "SEND";
  buttonSingOff.textContent = "Cerrar Sesión";

  buttonSend.className = "send";
  buttonxIcon.className = "buttonX";
  likeEmptyIcon.className = "likeEmptyIcon";
  likeFullIcon.className = "likeFullIcon";
  buttonSingOff.className = "buttonSingOff";
 

  imgUser.src = "./imagenes/user.png";
  imgUser.alt = "imgUser";
  logo2.src = logo2Img;
  logo2.alt = "Logo";
  fondo.src = fondoImg;
  fondo.alt = "Fondo";
  likeEmptyIcon.src = likeEmptyIconImg;
  likeEmptyIcon.alt = "Like1";
  likeFullIcon.src = likeFullIconImg;
  likeFullIcon.alt = "Like2";
  likeFullIcon.style.display = "none";
  buttonxIcon.src = buttonxIconImg;
  buttonxIcon.alt = "equis";

  getPost((querySnapshot) => {
    const listPost = document.createElement('article')
    listPost.innerHTML = ''
    taskContainer.innerHTML = ''
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      let pruebaPost = document.createElement("p");
      pruebaPost.textContent = doc.data().contenido;
      const inputUpdate = document.createElement('input')
      inputUpdate.setAttribute('value', doc.data().contenido)
      inputUpdate.setAttribute('style', 'display:none')
      inputUpdate.className = 'inputUpdate';
      inputUpdate.id = doc.id
      const btnUpdate = document.createElement('button')
      btnUpdate.textContent = 'Guardar'
      btnUpdate.setAttribute('style', 'display:none')
      btnUpdate.className = 'btnUpdate';
      btnUpdate.value = doc.id
      const buttonDeleteIcon = document.createElement("img");
      const buttonEditIcon = document.createElement("img");
      const inputComment = document.createElement("input");
      buttonDeleteIcon.setAttribute('data-id', doc.id)
      buttonEditIcon.setAttribute('data-id', doc.id)
      pruebaPost.id = "comment";
      buttonEditIcon.className = "edit";
      buttonEditIcon.id = "edit" + doc.id;
      buttonDeleteIcon.src = buttonDeleteIconImg;
      buttonDeleteIcon.alt = "Delete";
      buttonDeleteIcon.className = "delete";
      buttonEditIcon.src = buttonEditIconImg;
      buttonEditIcon.alt = "Edit";
      inputComment.id = "comment";
      inputComment.type = "texto";
      const input = document.createElement("textarea");
      const likeEmptyIconClone = likeEmptyIcon.cloneNode(true);
      const likeFullIconClone = likeFullIcon.cloneNode(true);
      input.id = "comments";
      input.value = doc.data().contenido;
      console.log(doc.data().contenido);
      let liked = false;
      likeEmptyIconClone.addEventListener("click", () => {
        if (!liked) {
          likeFullIconClone.src = likeFullIconImg;
          likeFullIconClone.style.display = "block";
          likeEmptyIconClone.style.display = "none";
          liked = true;
          console.log("liked");
        } else {
        }
      });
      likeFullIconClone.addEventListener("click", () => {
        if (liked) {
          likeEmptyIconClone.src =likeEmptyIconImg;
          likeEmptyIconClone.style.display = "block";
          likeFullIconClone.style.display = "none";
          liked = false;
          console.log("no liked");
        } else {
        }
      });
      listPost.append(input, likeEmptyIconClone, likeFullIconClone, pruebaPost,
        btnUpdate, buttonDeleteIcon, buttonEditIcon, buttonDeleteIcon, buttonEditIcon)
      taskContainer.append(listPost)
      const btnEdit = document.getElementById("edit" + doc.id);
      btnEdit.addEventListener('click', (e) => {
        
        const textoEditado = input.value;
        console.log('Guardando...', textoEditado);
        editPost(e.target.dataset.id, textoEditado)
      })
    });
    const btnDelete = taskContainer.querySelectorAll(".delete")
    btnDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deletePosta(dataset.id)
      })
    })

  });

  buttonSend.addEventListener("click", () => {
    post(inputShowModal.value).then((response) => {
      return response;
    });
    dialog.close();
    const task = document.createElement("p");
    task.textContent = inputShowModal.value;
    const taskContainer = document.querySelector("#taskContainer"); // Obtener el elemento que contenerá las tareas
    if (taskContainer) {
      taskContainer.appendChild(task);
      console.log(taskContainer);
    } else {
      console.error("No se encontró el elemento que contiene las tareas");
    }
    inputShowModal.value = "";
  });

  inputPost.addEventListener("click", function () {
    dialog.showModal();
  }); 

  buttonxIcon.addEventListener("click", function () {
    dialog.close();
  });
  
  buttonSingOff.addEventListener("click", () => {
    onNavigate("/");
  });
  
  
  dialog.appendChild(inputShowModal);
  dialog.appendChild(buttonSend);
  dialog.appendChild(buttonxIcon);
  
  div.append(
    dialog,
    logo2,
    fondo,
    inputPost,
    taskContainer,
    imgUser,
    buttonSingOff
  );
  return div;
};









