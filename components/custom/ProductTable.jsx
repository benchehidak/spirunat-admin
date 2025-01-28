"use client";
import React, { useState, useMemo } from "react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import axios from "axios";
import { Menu } from "@headlessui/react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";

const ProductTable = ({ salesdata }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalViewIsOpen, setModalViewIsOpen] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState(null);
  const [modalViewData, setModalViewData] = useState(null);
  const [modalEditData, setModalEditData] = useState({
    title: "",
    price: "",
    vendor: "",
    brand: "",
    desc: "",
    categories: "",
    stock: "",
    sold: "",
    weight: "",
  });

  const openModalDel = (productData) => {
    setModalIsOpen(true);
    setModalDeleteData(productData);
  };

  const closeModalDel = () => {
    setModalIsOpen(false);
  };

  const openModalView = (productData) => {
    setModalViewIsOpen(true);
    setModalViewData(productData);
  };

  const closeModalView = () => {
    setModalViewIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("edit", modalEditData);
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const vendor = document.getElementById("vendor").value;
    const brand = document.getElementById("brand").value;
    const stock = document.getElementById("stock").value;
    const weight = document.getElementById("weight").value;
    const sold = document.getElementById("sold").value;
    console.log("id", modalViewData.id);
    axios.post(`/api/products/updateProduct`, {
      id: modalViewData.id,
      title: title,
      price: price,
      vendor: vendor,
      brand: brand,
      stock: stock,
      sold: sold,
      weight: weight,
    });
  };

  const COLUMNS = [
    {
      Header: "Title",
      accessor: "title",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: (row) => {
        return <div>{row?.cell?.value}</div>;
      },
    },
    {
      Header: "Stock",
      accessor: "stock",
      Cell: (row) => {
        return <div>{row?.cell?.value}</div>;
      },
    },
    {
      Header: "Sold",
      accessor: "sold",
      Cell: (row) => {
        return <div>{row?.cell?.value}</div>;
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[-60px]"
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item key={i}>
                    <div
                      onClick={() => item.click(row?.cell?.row?.original)}
                      className={`
                                                ${
                                                  item.name === "delete"
                                                    ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                                                    : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                                                }
                                                w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse
                                            `}
                    >
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const actions = [
    {
      name: "Editer",
      icon: "heroicons-outline:eye",
      click: (productData) => {
        console.log(productData);
        openModalView(productData);
      },
    },
    {
      name: "Supprimer",
      icon: "heroicons-outline:trash",
      click: (productData) => {
        openModalDel(productData);
      },
    },
    // {
    //     name: "edit",
    //     icon: "heroicons-outline:trash",
    //     click: (productData) => {
    //         window.location.href = `/admin/editproduct/${productData.id}`;
    //     },
    // },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => salesdata, [salesdata]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  const deleteProduct = () => {
    closeModalDel();
    axios
      .post(`/api/products/deleteProduct`, { id: modalDeleteData.id })
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.warning(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
          setModalIsOpen(false);
        }
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        contentLabel="Delete Product Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md  overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="px-6 py-6 lg:px-8">
              <h4 className="font-medium text-lg mb-3 text-slate-900">
                Are you sure you want to delete {modalDeleteData?.title}?
              </h4>
              <div className="text-base text-slate-600 dark:text-slate-300">
                Stock: {modalDeleteData?.stock}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-100 rounded-b-lg lg:px-8">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeModalDel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={deleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalViewIsOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            marginTop: "5%",
          },
        }}
        contentLabel="View Product Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl  overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <form onSubmit={handleSubmit}>
          <div className="relative w-full max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <h4 className="font-medium text-lg mb-3 text-slate-900">
                  Product Details
                </h4>
                <div className="flex space-x-4">
                  <div className="w-1/2 space-y-4">
                    <Textinput
                      label="Title"
                      defaultValue={modalViewData?.title}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          title: e.target.value,
                        })
                      }
                      id="title"
                    />
                    <Textinput
                      label="Price"
                      defaultValue={modalViewData?.price}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          price: e.target.value,
                        })
                      }
                      id="price"
                      type="number"
                    />
                    <Textinput
                      label="Vendor"
                      defaultValue={modalViewData?.vendor}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          vendor: e.target.value,
                        })
                      }
                      id="vendor"
                    />
                    <Textinput
                      label="Brand"
                      defaultValue={modalViewData?.brand}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          brand: e.target.value,
                        })
                      }
                      id="brand"
                    />
                  </div>
                  <div className="w-1/2 space-y-4">
                    <Textarea label="Description" value={modalViewData?.desc} onChange={
                                            (e) => setModalEditData({ ...modalEditData, desc: e.target.value })
                                        }
                                        readonly={true}
                                         />
                    <Textarea
                      label="Categories"
                      value={modalViewData?.categoriesNames.join(", ")}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          categories: e.target.value,
                        })
                      }
                      readonly={true}
                    />
                    <Textinput
                      label="Stock"
                      defaultValue={modalViewData?.stock}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          stock: e.target.value,
                        })
                      }
                      id="stock"
                      type="number"
                    />
                    <Textinput
                      label="Sold"
                      defaultValue={modalViewData?.sold}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          sold: e.target.value,
                        })
                      }
                      id="sold"
                      type="number"
                    />
                    <Textinput
                      label="Weight"
                      defaultValue={modalViewData?.weight}
                      onChange={(e) =>
                        setModalEditData({
                          ...modalEditData,
                          weight: e.target.value,
                        })
                      }
                      id="weight"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="inline-flex h-full">
                <div className="px-6 py-3  rounded-b-lg lg:px-8">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalView}
                  >
                    Close
                  </button>
                </div>
                <div className="px-6 py-3  rounded-b-lg lg:px-8">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Products</h4>
          <div className="flex space-x-2">
            <GlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
              className="h-10"
            />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="border-t border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Price</th>
                    <th className="table-th">Stock</th>
                    <th className="table-th">Sold</th>
                    <th className="table-th"></th>
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                            <td
                              key={key}
                              {...restCellProps}
                              className="table-td"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className="form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center space-x-3 rtl:space-x-reverse flex-wrap">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={`${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium"
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
                  } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
    </>
  );
};

export default ProductTable;