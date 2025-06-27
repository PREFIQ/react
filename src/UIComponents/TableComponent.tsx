import { useEffect, useMemo, useState } from 'react';
import CommonTable, { type TableRowData } from '@/Components/common/commontable';
import CommonForm from '@/Components/common/commonform';
import AnimateButton from '@/Components/Input/animatebutton';
import Filter from '@/Components/common/Filter';
import Drawer from '@/Components/Drawer/Drawer';
import Pagination from '@/Components/Pagination/Pagination';
import ImageButton from '@/Components/Button/ImageBtn';
import DropdownRead from '@/Components/Input/Dropdown-read';
import Button from '@/Components/Input/Button';
import { exportToCSV } from '../Components/External/ExportToCSV';
import ButtonDropdown from '@/Components/Button/ButtonDropdown';

function TableComponent() {
  const head = ["ID", "Product", "Category", "Amount", "Action"];

  const [tableData, setTableData] = useState<TableRowData[]>([
    { id: "1", product: "Shorts", category: "Formal", amount: "2764" },
    { id: "2", product: "Tie", category: "Denim", amount: "4207" },
    { id: "3", product: "T-shirt", category: "Footwear", amount: "1681" },
    { id: "4", product: "Gloves", category: "Winter", amount: "1403" },
    { id: "5", product: "Boots", category: "Denim", amount: "4208" },
    { id: "6", product: "Cap", category: "Formal", amount: "4573" },
    { id: "7", product: "Shorts", category: "Accessories", amount: "3960" },
    { id: "8", product: "Sunglasses", category: "Casual", amount: "4092" },
    { id: "9", product: "Gloves", category: "Winter", amount: "4228" },
    { id: "10", product: "Hoodie", category: "Casual", amount: "4052" },
    { id: "11", product: "Wallet", category: "Sports", amount: "3373" },
    { id: "12", product: "Cap", category: "Accessories", amount: "2123" },
    { id: "13", product: "T-shirt", category: "Denim", amount: "3677" },
    { id: "14", product: "Watch", category: "Accessories", amount: "2176" },
    { id: "15", product: "T-shirt", category: "Accessories", amount: "4792" },
    { id: "16", product: "Sneakers", category: "Accessories", amount: "3771" },
    { id: "17", product: "Jacket", category: "Winter", amount: "3554" },
    { id: "18", product: "Jacket", category: "Formal", amount: "2253" },
    { id: "19", product: "T-shirt", category: "Accessories", amount: "2631" },
    { id: "20", product: "T-shirt", category: "Accessories", amount: "4413" },
    { id: "21", product: "Sneakers", category: "Sports", amount: "2582" },
    { id: "22", product: "Boots", category: "Formal", amount: "3253" },
    { id: "23", product: "Hoodie", category: "Accessories", amount: "3175" },
    { id: "24", product: "Dress", category: "Accessories", amount: "4286" },
    { id: "25", product: "Dress", category: "Accessories", amount: "2549" },
    { id: "26", product: "Sneakers", category: "Winter", amount: "4839" },
    { id: "27", product: "Wallet", category: "Denim", amount: "3537" },
    { id: "28", product: "Gloves", category: "Winter", amount: "1179" },
    { id: "29", product: "Socks", category: "Winter", amount: "3032" },
    { id: "30", product: "Blazer", category: "Accessories", amount: "2405" },
    { id: "31", product: "Dress", category: "Winter", amount: "4265" },
    { id: "32", product: "Gloves", category: "Winter", amount: "2691" },
    { id: "33", product: "Watch", category: "Denim", amount: "2290" },
    { id: "34", product: "Cap", category: "Winter", amount: "2340" },
    { id: "35", product: "Scarf", category: "Accessories", amount: "3141" },
    { id: "36", product: "Tie", category: "Winter", amount: "2789" },
    { id: "37", product: "Hoodie", category: "Winter", amount: "2580" },
    { id: "38", product: "Scarf", category: "Accessories", amount: "3922" },
    { id: "39", product: "Hoodie", category: "Sports", amount: "3052" },
    { id: "40", product: "Wallet", category: "Accessories", amount: "1471" },
    { id: "41", product: "Cap", category: "Winter", amount: "1614" },
    { id: "42", product: "Scarf", category: "Denim", amount: "1999" },
    { id: "43", product: "Boots", category: "Denim", amount: "2876" },
    { id: "44", product: "Backpack", category: "Formal", amount: "2481" },
    { id: "45", product: "Cap", category: "Accessories", amount: "4965" },
    { id: "46", product: "Scarf", category: "Casual", amount: "1748" },
    { id: "47", product: "Blazer", category: "Accessories", amount: "3016" },
    { id: "48", product: "Dress", category: "Accessories", amount: "2433" },
    { id: "49", product: "Tie", category: "Accessories", amount: "2142" },
    { id: "50", product: "Tie", category: "Casual", amount: "4741" }
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [editId, setEditId] = useState<string | null>(null); // updated

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(head);

 const handleEdit = (rowData: any) => {
  if (Array.isArray(rowData)) {
    // Bulk edit
    setEditData(rowData); // ✅ already works
  } else {
    setEditData(rowData);
    setEditId(rowData.id);
  }

  setFormOpen(true);
};

  const handleFormSubmit = (formData: any[] | any) => {
  const updated = [...tableData];

  if (Array.isArray(formData)) {
    formData.forEach((entry) => {
      const index = updated.findIndex((d) => d.id === entry.id);
      if (index !== -1) {
        updated[index] = entry; // update with new value
      } else {
        updated.push(entry); // add if new
      }
    });
  } else if (editId !== null) {
    const index = updated.findIndex((d) => d.id === editId);
    if (index !== -1) {
      updated[index] = { ...updated[index], ...formData };
    }
  }

  setTableData(updated);
  setFormOpen(false);
  setEditId(null);
  setEditData({});
};



  const handleCreate = () => {
    setEditData({});
    setEditId(null); // updated
    setFormOpen(true);
  };

  const filteredData = useMemo(() => {
    return tableData.filter(row =>
      head.every(h => {
        const key = h.toLowerCase();
        if (!filters[key] || key === 'action') return true;
       return String(row[key] ?? "")
  .toLowerCase()
  .includes(filters[key].toLowerCase());

      })
    );
  }, [filters, tableData]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredData.length, currentPage, rowsPerPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleDeleteSelected = (ids: string[]) => {
    const updated = tableData.filter(row => !ids.includes(row.id));
    setTableData(updated);
  };

  const handleDelete = (index: number) => {
    const updated = [...tableData];
    updated.splice(index, 1);
    setTableData(updated);
  };

  const generatePageSizeOptions = (total: number): number[] => {
    const base = Math.max(Math.floor(total * 0.1), 1);
    const steps = [1, 5, 10, 15, 20];
    const options: number[] = [];
    for (const step of steps) {
      const val = base * step;
      if (val <= total) options.push(val);
    }
    return options;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <ImageButton className="bg-update p-2 text-white" icon="filter" onClick={() => setFilterDrawerOpen(!filterDrawerOpen)} />

          {Object.entries(filters)
            .filter(([key, value]) => value && key !== "action")
            .map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-1 px-2 text-xs rounded-full bg-muted text-muted-foreground border border-ring"
              >
                <span className="capitalize">{key}</span>: <span>{value}</span>
                <ImageButton
                  icon='close'
                  onClick={() => setFilters(prev => {
                    const updated = { ...prev };
                    delete updated[key];
                    return updated;
                  })}
                  className="text-xs p-2 font-bold text-delete hover:text-destructive"
                />
              </div>
            ))}
        </div>

        <div className='flex gap-2 items-center'>
          <ButtonDropdown
            icon="column"
            columns={head.filter((h) => h !== "ID")}
            visibleColumns={visibleColumns}
            onChange={setVisibleColumns}
            className='block m-auto'
          />
          <ImageButton icon="export"  className='p-2' onClick={() => exportToCSV(filteredData, head, `sample.csv`)} />
          <ImageButton icon="print" className='p-2' onClick={() => setFilterDrawerOpen(!filterDrawerOpen)} />
          <AnimateButton label="Create" className="bg-create" mode="create" onClick={handleCreate} />
        </div>
      </div>

      <div className='mt-5'>
        <CommonTable
        head={head.filter(h => visibleColumns.includes(h))}
        body={paginatedData}
        onEdit={handleEdit}
        onCreate={handleCreate}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalCount={filteredData.length}
        onPageChange={setCurrentPage}
        onDelete={handleDelete}
        onDeleteSelected={handleDeleteSelected}
        onCellClick={(key, value) => {
          setFilters(prev => ({ ...prev, [key]: value }));
          setFilterDrawerOpen(true);
        }}
        filterOnColumnClick
      />
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <label htmlFor="rows-per-page" className="whitespace-nowrap">Records per page:</label>
          <DropdownRead
            id="page"
            items={generatePageSizeOptions(filteredData.length).map(String)}
            err=""
            // label='pages'
            className='w-30'
            onChange={(value) => {
              const selectedValue = Array.isArray(value) ? value[0] : value;
              const parsed = parseInt(selectedValue, 10);
              if (!isNaN(parsed)) {
                setRowsPerPage(parsed);
              }
            } } placeholder={''}          />
        </div>

        <p>
          {Math.min((currentPage - 1) * rowsPerPage + 1, filteredData.length)}–{Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} products
        </p>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / rowsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>

      {formOpen && (
        <CommonForm
          fields={[
            { id: "product", label: "Product Name", type: "textinput", className: "w-full", errMsg: "Enter Product Name" },
            { id: "category", label: "Category Name", type: "textinput", className: "w-full", errMsg: "Enter Category Name" },
            { id: "amount", label: "Amount", type: "textinput", className: "w-full", errMsg: "Enter Amount" },
          ]}
          isPopUp
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          formName="Product"
          successMsg="Form submitted successfully"
          faildMsg="Form submission failed"
          initialData={Array.isArray(editData) ? {} : editData}
          bulkData={Array.isArray(editData) ? editData : undefined}
          onSubmit={handleFormSubmit}
        />
      )}

      <Drawer isOpen={filterDrawerOpen} onClose={() => setFilterDrawerOpen(false)} position="bottom" title="Filters">
        <Filter
          head={head}
          filters={filters}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        />
        <div className='flex justify-end gap-3 mt-5'>
          <Button
            label='Clear'
            className="text-delete-foreground bg-delete"
            onClick={() => {
              setFilters({});
              setFilterDrawerOpen(false);
            }}
            children={undefined}
          />

          <Button
            label="Apply changes"
            className="bg-update text-update-foreground"
            onClick={() => setFilterDrawerOpen(false)}
            children={undefined}
          />
        </div>
      </Drawer>
    </div>
  );
}

export default TableComponent;
