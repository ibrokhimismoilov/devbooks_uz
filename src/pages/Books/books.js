import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import apiClient from "../../services/apiClient";
import defaultBookImg from "../../assets/images/books/book.svg";
import LoaderGrid from "../../components/Loader/LoaderGrid";

// icons
import { FaRegMoneyBillAlt, FaRegEye } from "react-icons/fa";
import { BiBookAlt } from "react-icons/bi";
import { AiOutlineLeft, AiOutlineRight, AiOutlineUser } from "react-icons/ai";

const categoryBtns = [
  { name: "all", id: 1 },
  { name: "classic", id: 2 },
  { name: "biography", id: 3 },
  { name: "science", id: 4 },
];

const Books = () => {
  // book category
  const [activeCategory, setActiveCategory] = useState(1);
  const [categoryData, setCategoryData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    hasNextPage: null,
    hasPrevPage: null,
    nextPage: null,
    prevPage: null,
    page: null,
    totalPages: null,
  });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient("/books");
      // console.log("Fetch data => ", data);
      const { docs, ...restPagination } = data.payload;
      setPagination(restPagination);
      setBooks(docs);
      setCategoryData(docs);
      setLoading(false);
    } catch (err) {
      // console.log("Fetch err => ", err);
      setLoading(false);
    }
  };

  const searchBooks = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient(`/books/search?title=${searchData}`);
      // console.log(data.payload);
      setBooks(data.payload);
      setCategoryData(data.payload);
      setLoading(false);
    } catch (err) {
      // console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchData.length) {
      searchBooks();
    } else {
      fetchBooks();
    }
  }, [searchData]);

  const queryPageHandler = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await apiClient(`/books?page=${page}`);
      // console.log("Query Books data =>>>", data);
      const { docs, ...restPagination } = data.payload;
      setPagination(restPagination);
      setBooks(docs);
      setCategoryData(docs);
      setActiveCategory(1);
      setLoading(false);
    } catch (err) {
      // console.log("Query Books err =>>>", err);
      setLoading(false);
    }
  };

  const Pagination = ({
    totalPages,
    page,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  }) => {
    return (
      <ul className="pagination">
        <li
          className={`page-item page-prev ${!hasPrevPage ? "disabled" : ""}`}
          onClick={hasPrevPage ? () => queryPageHandler(prevPage) : null}
        >
          <AiOutlineLeft />
        </li>

        {Array(totalPages)
          .fill(1)
          .map((item, index) => {
            return (
              <li
                key={index}
                className={`page-item ${index + 1 === page ? "active" : ""}`}
                onClick={() => queryPageHandler(index + 1)}
              >
                {index + 1}
              </li>
            );
          })}
        <li
          className={`page-item page-next ${!hasNextPage ? "disabled" : ""}`}
          onClick={hasNextPage ? () => queryPageHandler(nextPage) : null}
        >
          <AiOutlineRight />
        </li>
      </ul>
    );
  };

  const CategoryTabs = () => (
    <div className="books__filter">
      {categoryBtns.map((item, index) => {
        return (
          <button
            key={index}
            className={`books__filter-btn ${
              item.id === activeCategory ? "active" : ""
            }`}
            onClick={
              item.id !== activeCategory ? () => filterHendler(item) : null
            }
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );

  const filterHendler = (item) => {
    setActiveCategory(item.id);
    let newBooks = books?.filter(
      (book) =>
        book.category.toLowerCase() === item.name.toLowerCase() ||
        item.name.toLowerCase() === "all"
    );
    setCategoryData(newBooks);
  };

  // console.log(categoryData);

  return (
    <div className="books">
      <Header visibleSearch={true} searchDataHander={setSearchData} />
      <div className="auto-container">
        {searchData.length ? (
          <h1 className="books-title">
            Siz qidirgan <span className="search-title">{searchData}</span>
            oid kitoblar -{" "}
            {books?.length ? books?.length + " ta" : " topilmadi"}
          </h1>
        ) : (
          <>
            <h1 className="books-title">Asosiy kategoriyalar</h1>
            {CategoryTabs()}
          </>
        )}

        <div className="books__wrapper">
          {!loading ? (
            categoryData?.map((book) => {
              return (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  className="books__wrapper-item"
                >
                  <div className="img">
                    <img
                      src={
                        [".jpeg", ".jpg", ".png", ".svg"].includes(
                          book?.imageLink?.slice(
                            book?.imageLink?.lastIndexOf(".")
                          )
                        ) && book?.imageLink?.startsWith("http")
                          ? book?.imageLink
                          : defaultBookImg
                      }
                      alt="book"
                    />
                  </div>

                  <div className="body">
                    <h1 className="name">
                      {book.title.length > 30
                        ? book.title.slice(0, 27) + "..."
                        : book.title}
                    </h1>
                    <p className="author">
                      <AiOutlineUser /> {book.author.firstName}{" "}
                      {book.author.lastName}
                    </p>
                    <p className="icon-text">
                      <FaRegMoneyBillAlt />: ${book.price}
                    </p>
                    <p className="icon-text">
                      <FaRegEye />: {book.views} view
                    </p>
                    <p className="icon-text">
                      <BiBookAlt />: {book.pages} pages
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <LoaderGrid />
          )}
        </div>
        {!searchData.length && (
          <Pagination {...pagination} queryPageHandler={queryPageHandler} />
        )}
      </div>
    </div>
  );
};

export default Books;
