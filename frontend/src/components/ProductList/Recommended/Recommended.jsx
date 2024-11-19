import { BsFilter } from "react-icons/bs";
import "./Recommended.css";

const Recommended = ({ handleClick, setShowProductFilterSidebar, ShowProductFilterSidebar }) => {
  return (
    <>
      <div>
        <div className="recommended-header">
          <h2 className="recommended-title">Recommended</h2>
          {!ShowProductFilterSidebar && <h2 className="sidebar-filter" onClick={e => setShowProductFilterSidebar(true)}><BsFilter size={28} /></h2>}
        </div>
        <div className="recommended-flex">
          {
            ["All Products", "Apple", "Realme", "Canon", "Nike", "Puma"].map(recommendedOption => (<button key={recommendedOption} onClick={handleClick} value={recommendedOption} className="btns">
              {recommendedOption}
            </button>))

          }
        </div>
      </div>
    </>
  );
};

export default Recommended;