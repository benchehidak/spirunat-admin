/* eslint-disable react/display-name */
'use client';
import React, { useState, useMemo, useEffect } from "react";

import { Menu } from "@headlessui/react";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "./GlobalFilter";

import axios from "axios";

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/ModalDelete";
import AddModal from "@/components/custom/CategoryAddModal";
import Textinput from "@/components/ui/Textinput"
const CategoryTable =  (salesdata) => {

  const COLUMNS = [
    {
      Header: "nom",
      accessor: "nom",
      Cell: (row) => {
        // console.log(row)
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "subcatego",
      accessor: "subcatego",
      Cell: (row) => {
        return (row?.cell?.value);
      },
      // split(',').map((item) => <div>{item}</div>
    },
    {
      Header: "Nbarticle",
      accessor: "Nbarticle",
      Cell: (row) => {
        return <span style={{ textTransform: 'none' }} >{row?.cell?.value}</span>;
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[-60px] "
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
                  
                    ${item.name === "delete"
                          ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                          : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                        }
                     w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                     first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}

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
      name: "delete",
      icon: "heroicons-outline:trash",
      click: (userdata) => {
        openModalDelete(userdata);
        console.log(DeletemodalIsOpen)
      }

    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => salesdata.salesdata, []);
  const [DeletemodalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [ModalDeleteData, setModalDeleteData] = useState(null)

  const [AddModalIsOpen, setAddModalIsOpen] = useState(false);


  const [AddCategoryName, setAddCategoryName] = useState(null);

  const [AddCategoryBtn, setAddCategoryBtn] = useState(false);

  const openModalDelete = (userdata) => 
  {
    console.log(userdata);
    setModalDeleteData(userdata);
    setDeleteModalIsOpen(!DeletemodalIsOpen);
  }

  const openModalAdd = () => { 
    setAddModalIsOpen(!AddModalIsOpen);
  }

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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

  const addCategory = () =>{
    setAddCategoryBtn(true)
    axios.post('/api/categories/createcategory', {
      nom: AddCategoryName,
    })
      .then(function (response) {
        // console.log(response);
        setAddCategoryName(null);
        setAddModalIsOpen(false);
        setAddCategoryBtn(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  return (
    <>
      {/* MODAL DELETE  */}
      <Modal
        title="Delete Category"
        label="Delete Category"
        uncontrol
        footerContent=
        {
          <Button
            text="Add"
            className="btn-outline-success "
            onClick={() => {
              alert("use Control Modal");
            }}
          />
        }
          IsOpen={DeletemodalIsOpen}
        >

        <h4 className="font-medium text-lg mb-3 text-slate-900">
          etes vous sur de vouloir supprimer {ModalDeleteData?.name}  .
        </h4>
        <div className="text-base text-slate-600 dark:text-slate-300">
          Sous-categories : {ModalDeleteData?.SubCategory}
        </div>
        <div className="text-base text-slate-600 dark:text-slate-300">
          Nombre d'articles : {ModalDeleteData?.Nbarticle}
        </div>
        
      </Modal>
      {/* MODAL ADD  */}
      <AddModal
        title="Ajouter Categorie"
        label="Ajouter Categorie"
        uncontrol
        footerContent={
          <Button
            text="Add"
            className="btn-outline-success "
            onClick={() => {
              addCategory();
            }}
            disabled={AddCategoryBtn}
          />
        }
        IsOpen={AddModalIsOpen}

      >
        <Textinput
          label="Nom Categorie*"
          id="pn"
          type="text"
          placeholder="Nom Categorie "
          value={AddCategoryName}
          onChange={(e) => {setAddCategoryName(e.target.value)}}
        />

       </AddModal>
      {/* TABLE   */}
      <Card noborder>

        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Categories</h4>
          <div className="flex ">
          </div>
          <div className="flex space-x-2">
            <Button
              text="+"

              className="h-8 mt-1
              px-3 py-2 text-sm font-medium text-center  text-white rounded-lg bg-green-600   hover:bg-green-700  focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                openModalAdd()
              }}
            />
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} className="h-10" />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">

                  <tr>
                    <th className="table-th">
                      Nom categorie
                    </th>
                    <th className="table-th">
                      Sous categorie
                    </th>
                    <th className="table-th">
                      Nb. Article (Par Categorie)
                    </th>

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
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
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
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
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
                  className={` ${pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
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

export default CategoryTable;
