import { logincreateUserWithEmailAndPassword} from '../Firebase/authentication.js';
import { getAuth, updateProfile } from "firebase/auth";
import { onNavigate } from '../router.js';
import logoregImg from '../imagenes/logo.png';
import fondoImg from '../imagenes/fondo-cel.png';

export const register = () => {
  const div = document.createElement('div');
  const logoreg = document.createElement('img');
  const fondo = document.createElement('img');
  const title = document.createElement('h2');
  const buttonRegister = document.createElement('button');
  const inputEmail = document.createElement('input');
  const emailError = document.createElement('span'); // agregado
  const inputPass = document.createElement('input');
  const inputCreate = document.createElement('input');

  inputEmail.placeholder = 'e-mail: xxxx@pppp.com';
  inputPass.placeholder = 'password';
  inputCreate.placeholder = 'Username';

  inputPass.type = 'password';
  inputEmail.type = 'email'

  div.id = 'section';
  fondo.id = 'fondo';
  logoreg.id = 'logoreg';
  emailError.id = 'email-error'; 

  buttonRegister.className = 'buttonRegister';
  inputEmail.className = 'email';
  inputPass.className = 'password';
  inputCreate.className = 'username';
 
  buttonRegister.textContent = 'REGISTER';

  logoreg.src = logoregImg;
  logoreg.alt = 'Logo';

  fondo.src = fondoImg;
  fondo.alt = 'Fondo';
  
  const auth = getAuth();
  buttonRegister.addEventListener('click', () => {
    logincreateUserWithEmailAndPassword(inputEmail.value, inputPass.value).then(
      () => {
       
       return  updateProfile(auth.currentUser, {
          displayName: inputCreate.value,
        });
      })
      .then(
      () => {
        onNavigate('/wall');
      },
      
    );

    inputEmail.after(emailError); // agregar el elemento después del input
    emailError.style.display = ''; // ocultar el mensaje por defecto
  });

  div.append(
    title,
    logoreg,
    fondo,
    inputCreate,
    inputEmail,
    inputPass,
    buttonRegister,
  );

  return div;
};
