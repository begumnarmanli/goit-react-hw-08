import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);
  const handleChange = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };
  return (
    <div className={styles.searchBox}>
      <label className={styles.label} htmlFor="search">
        Find contacts by name
      </label>
      <input
        id="search"
        type="text"
        value={filter}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBox;
