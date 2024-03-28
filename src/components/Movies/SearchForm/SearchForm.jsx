import React, {useState} from 'react';
import FilterCheckBox from './FilterCheckbox/FilterCheckbox.jsx';
import styles from './SearchForm.module.css';

function SearchForm() {
  const [search, setSearch] = useState("")
  return (
    <section className={styles["search__container"]}>
        <form
          className={styles["search__form"]}
          name="search"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <div className={styles["search__wrapper"]}>
            <input
              className={styles["search__input"]}
              name="search"
              type="search"
              placeholder='Фильм'
              required
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
              <button
                className={styles["search__button"]}
                type="submit"
                aria-label="search-button"
              />
              </div>
              <FilterCheckBox />
      
        </form>
    </section>
  );
}

export default SearchForm;
