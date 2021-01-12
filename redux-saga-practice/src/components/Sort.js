import "./Sort.css";
const Sort = ({ sorting, handleSorting }) => {
  return (
    <div className="sort">
      <a
        onClick={() => {
          handleSorting("like");
        }}
        href="javascript:void(0);"
        className={
          "sort__care" + (sorting === "like" ? " sort__care--active" : "")
        }
      >
        Quan tâm nhất
      </a>
      <a
        onClick={() => {
          handleSorting("time");
        }}
        href="javascript:void(0);"
        className={
          "sort__new" + (sorting === "time" ? " sort__new--active" : "")
        }
      >
        Mới nhất
      </a>
    </div>
  );
};
export default Sort;
