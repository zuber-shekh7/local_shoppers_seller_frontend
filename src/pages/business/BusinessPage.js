import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clipboard from "clipboardy";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getBusiness } from "../../actions/businessActions";
import routes from "../../utils/routes";
import { HiShare } from "react-icons/hi";
import Breadcrumb from "../../components/shared/Breadcrumb";
import HeaderContainer from "../../components/shared/HeaderContainer";
import { Error } from "../../components/messages";
import { Loader } from "../../components/loaders";

const BusinessPage = () => {
  const { businessId } = useParams();

  const { loading, business, error } = useSelector(
    (state) => state.getBusiness
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBusiness(businessId));
  }, [businessId, dispatch]);

  const copyToClipboard = async () => {
    const onlineStoreLink = `${window.location.origin}/business/${businessId}`;
    await clipboard.write(onlineStoreLink);
    toast.success("Linked copied successfully.");
  };

  return (
    <main>
      <HeaderContainer>
        <h1>Manage Business</h1>
      </HeaderContainer>
      <section className="container">
        {/* toast */}
        <ToastContainer
          position="bottom-center"
          hideProgressBar
          closeOnClick
          draggable={false}
          theme="colored"
        />
        {/* breadcrumb */}
        <Breadcrumb
          links={[
            {
              name: "home",
              to: routes.dashboard,
            },
            {
              name: "manage business",
              to: "",
            },
          ]}
        />
        {error && <Error />}
        {loading && <Loader />}
        {business && (
          <div className="w-full mx-auto">
            <div className="flex justify-end mb-5 gap-x-2">
              <button
                onClick={copyToClipboard}
                className="flex justify-center items-center gap-x-2 px-3 py-1 text-lg bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
              >
                <HiShare />
                <span>Share</span>
              </button>
              <Link
                to={`${routes.getBusiness}/${business._id}/edit`}
                className="px-3 py-1 text-lg bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
              >
                <span>Edit</span>
              </Link>
            </div>
            <div className="mb-5">
              <img
                className="h-96 w-full object-cover object-center rounded-lg shadow-sm"
                src={business.image}
                alt={business.name}
              />
            </div>
            <div className="text-center">
              <h1>{business.name}</h1>
              <h5 className="font-light">{business.description}</h5>
              <h6>&bull; {business.category.name} &bull;</h6>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2>Categories</h2>
                <Link
                  to={routes.getCategories}
                  className="px-3 py-1 text-lg bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
                >
                  <span>Explore</span>
                </Link>
              </div>
              <hr />
              {business.categories && (
                <>
                  {business.categories.length > 0 ? (
                    <div>
                      {business.categories.map((category) => {
                        return (
                          <Link
                            key={category._id}
                            to={`/business/${business._id}/categories/${category._id}`}
                          >
                            <div
                              className="grid h-64 grid-cols-1 rounded-lg mb-3 overflow-hidden shadow-md hover:opacity-90 hover:text-indigo-700 transition duration-500"
                              style={{
                                backgroundImage: `url(${category.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <div className="flex justify-center items-center">
                                <h3 className="text-indigo-600 px-3 py-2 bg-white  rounded-lg text-2xl sm:text-4xl md:text-6xl font-semibold">
                                  {category.name}
                                </h3>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <h4>No Categories available</h4>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default BusinessPage;
