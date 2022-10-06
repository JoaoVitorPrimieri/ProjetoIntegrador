import rodape from "../css/rodape.module.css";

function Footer() {
  return (
    <footer className={rodape.rodape}>
      <div className={rodape.container}>
      
      <p className={rodape.text}>
        <span>Prestax &copy; 2022</span>
      </p>
      </div>
    </footer>
  );
}
export default Footer;