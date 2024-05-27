import Footer from '../Homepage/Footer/Footer';
import HeaderBis from '../Homepage/Headers/HeaderBis/HeaderBis';
import './Error404.scss';

function Error404() {
  return (
    <>
      <HeaderBis />
      <section className="error404">
        <h1>Error 404</h1>
      </section>
      <Footer />
    </>
  );
}
export default Error404;
