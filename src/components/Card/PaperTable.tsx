import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useState } from "react";
import type { PaperType } from "@/services/type";

interface PaperColumn {
  key: string;
  label: string;
  width?: number;
}

interface PaperTableProps {
  papers: PaperType[];
  columns: PaperColumn[];
}

export default function PaperTable({ papers, columns }: PaperTableProps) {
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const renderCellValue = (column: PaperColumn, paper: PaperType) => {
    const value = paper[column.key];

    if (column.key === "authors") {
      return paper.authors?.filter(Boolean).join(", ");
    }

    if (value === null || value === undefined) {
      return "-";
    }

    return String(value);
  };

  return (
    <Paper sx={{ width: "100%", pointerEvents: "auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  sx={{ backgroundColor: "lightskyblue", fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {papers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((paper, index) => (
                <TableRow hover key={paper.paper_id ?? index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCellValue(column, paper)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={papers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
