// "use client"
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../_Services/GlobalApi";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);

const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ studentList, refreshData }) => {
  const DeleteRecord = (id) => {
    GlobalApi.DeleteStudentRecord(id).then((res) => {
      if (res) {
        toast("Record deleted successfully");
        refreshData();
      }
    });
  };
  const CustomButton = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"blueButton"}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                DeleteRecord(props?.data?.id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [columnDefs] = useState([
    {
      headerName: "Roll No",
      field: "rollNumber",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Full Name",
      field: "fullname",
      sortable: true,
      filter: true,
    },
    { headerName: "Class", field: "class", sortable: true, filter: true },
    { headerName: "Contact", field: "contact", sortable: true, filter: true },
    { field: "action", cellRenderer: CustomButton },
  ]);

  const [searchInput, setSearchInput] = useState();
  const [rowData, setRowData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentList && studentList.length > 0) {
      setRowData(studentList);
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setRowData([]);
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [studentList]);

  return (
    <div style={{ height: "550px", width: "80%", margin: "10px" }}>
      <div className="flex gap-4 mb-4 mt-4 rounded-lg border-2 p-2 hover:border-blue-800  ">
        <Search />
        <input
          type="text"
          placeholder="Enter anything to search"
          className="outline-none w-full"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full text-lg font-semibold text-gray-600">
          Loading student data...
        </div>
      ) : rowData && rowData.length > 0 ? (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          theme={themeQuartz}
          pagination={true}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          quickFilterText={searchInput}
        />
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500 italic">
          No student data available.
        </div>
      )}
    </div>
  );
};

export default StudentListTable;
