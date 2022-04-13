import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../../actions/categoriesActions";
import { Card } from "../../components/cards";
import Breadcrumb from "../../components/shared/Breadcrumb";
import HeaderContainer from "../../components/shared/HeaderContainer";
import { HiOutlinePlus } from "react-icons/hi";
import routes from "../../utils/routes";
import { Loader } from "../../components/loaders";
import { Error } from "../../components/messages";

const CategoriesPage = () => {
  const { loading, categories, error } = useSelector(
    (state) => state.getCategories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <main>
      <HeaderContainer>
        <h1>Manage Categories</h1>
      </HeaderContainer>
      <section className="container">
        {/* breadcrumb */}
        <Breadcrumb
          links={[
            {
              name: "home",
              to: routes.dashboard,
            },
            {
              name: "categories",
              to: "",
            },
          ]}
        />
        {loading && <Loader />}
        {error && <Error />}
        {categories && categories.length && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="hover:bg-indigo-50 rounded-lg border overflow-hidden">
              <Link
                className="flex justify-center items-center md:h-full h-48"
                to={routes.createCategory}
              >
                <h2 className="flex justify-center items-center space-x-5">
                  <HiOutlinePlus /> Add Category
                </h2>
              </Link>
            </Card>
            {categories.map((category) => {
              return (
                <Link
                  to={`${routes.getCategories}/${category._id}`}
                  key={category._id}
                  className="card border-0"
                >
                  <div
                    className="flex justify-center h-64 w-full rounded-lg hover:opacity-90 hover:text-indigo-700 transition duration-500"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <h2 className="text-indigo-600 px-3 py-2 bg-white rounded-lg">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-3">
            <Card className="hover:bg-indigo-50 rounded-lg border overflow-hidden">
              <Link
                className="flex justify-center items-center h-48"
                to={routes.createCategory}
              >
                <h2 className="flex justify-center items-center space-x-5">
                  <HiOutlinePlus /> Add Category
                </h2>
              </Link>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
};

export default CategoriesPage;
