import {
   loginGoogle,
   loginWithEmailAndPassword,
} from '../Firebase/authentication.js';
import { onNavigate } from '../router.js';
import {userData} from '../store/userData.js'
import logoImg from '../imagenes/logo.png';
import fondoImg from '../imagenes/fondo-cel.png';
import lineImg from '../imagenes/rayita2-05.png';
import buttonGoogleImg from '../imagenes/buttonGoogle.png';
import { FirebaseError } from 'firebase/app';

export const welcome = () => {
  const div = document.createElement('div');
  const logo = document.createElement('img');
  const fondo = document.createElement('img');
  const title = document.createElement('h2');
  const buttonGetinto = document.createElement('button');
  const line = document.createElement('img');
  const buttonGoogle = document.createElement('img', 'input');
  const buttonCreate = document.createElement('button');
  const inputPassword = document.createElement('input');
  const inputUsername = document.createElement('input');
  

  inputUsername.type = 'email';
  inputUsername.required = 'true';
  inputPassword.type = 'password';
  inputPassword.required= 'true';

  inputUsername.placeholder = 'e-mail';
  inputPassword.placeholder = 'password';
  
  logo.id = 'logo';
  fondo.id = 'fondo';
  div.id = 'section';
  inputPassword.id = 'password';
  inputUsername.id = 'username';
  

  title.className = 'title';
  buttonGetinto.className = 'buttonGetinto';
  buttonCreate.className = 'buttonCreate';
  buttonGoogle.className = 'buttonGoogle';
  line.className = 'line';

  buttonGetinto.textContent = 'LOGIN';
  buttonCreate.textContent = 'CREATE ACCOUNT';

  logo.src = logoImg;
  logo.alt = 'Logo';

  fondo.src = fondoImg;
  fondo.alt = 'Fondo';

  line.src = lineImg;
  line.alt = 'line';

  buttonGoogle.src = buttonGoogleImg;
  buttonGoogle.alt = 'buttonGoogle';

  buttonGetinto.addEventListener('click', () => {
    if (inputUsername.value === '' || inputPassword.value === '') {
      swal('Ingresa tus datos');
      
    } else {
      loginWithEmailAndPassword(inputPassword.value, inputUsername.value).then(
        () => {
          onNavigate('/wall');
        },
      )
      /*.catch((error) => {
       // console.error(error); // Aquí se puede manejar el error de forma específica
        if (error.code === FirebaseError) {
          swal('La dirección de correo electrónico o contraseña no es válida. Inténtalo de nuevo.');
          return onNavigate('/'); // Evita que el usuario navegue a otra vista
        }
        swal('Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo más tarde.');
        console.log(error);
      });*/
      
    }
  });

  buttonCreate.addEventListener('click', () => {
    onNavigate('/register');
  });
  buttonGoogle.addEventListener('click', () => {
    loginGoogle().then((userCredential) => {
      userData.userName = userCredential.user.email;

      onNavigate('/wall');
    });
  });
  

  div.append(
    title,
    logo,
    fondo,
    inputUsername,
    inputPassword,
    buttonGetinto,
    line,
    buttonGoogle,
    buttonCreate,
  );

  return div;
};
