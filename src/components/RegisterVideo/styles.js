import styled from "styled-components";

export const StyledRegisterVideo = styled.div`
  .add-video {
    width: 50px;
    height: 50px;
    font-size: 30px;
    font-weight: 0.8em;
    color: inherit;
    position: fixed;
    bottom: 16px;
    right: 16px;
    border: 0;
    background-color: red;
    border-radius: 50%;
    z-index: 99;
    cursor: pointer;    
    transition: 1s;
    
  }
  .add-video:hover{
    background-color: rgb(255, 0, 200);   
    
  }
  .close-modal {
    width: 24px;
    height: 24px;
    position: absolute;
    font-size: 1.5em;
    text-shadow: 5px 5px 2px black;
    top: 8px;
    right: 16px;
    color: inherit;
    background-color: ${({ theme }) => theme.backgroundLevel1};
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100;
    //botão fechar
  }

  .box-thumb {
    margin-bottom: 10px;
    border-radius: 20px;
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 100%;
  }

  .box-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 20px 20px 0px 0px;
  }

  button[type="submit"] {
    background-color: red;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    color: inherit;
  }
  form {
    width: 100%;
    padding: 5%;
    background-color: rgba(0, 0, 0, .7);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    & > div {
      flex: 1;
      border-radius: 20px;
      max-width: 320px;
      max-height: 400px;
      background-color: ${({ theme }) => theme.backgroundLevel2};
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 16px;
      padding-top: 200px;
      transition: .4s;
    }
  }
  input {
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.borderBase};
    padding: 8px 10px;
    margin-bottom: 10px;
    outline: none;
    color: #222222;
    background-color: #f9f9f9;
    color: ${({ theme }) => theme.textColorBase};
    background-color: ${({ theme }) => theme.backgroundBase};
  } 
  
  
`;
