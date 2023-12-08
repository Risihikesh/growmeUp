
import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';

interface Department {
  department: string;
  sub_departments: string[];
}

const data: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const SecondPageComponent2: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const handleDepartmentCheckboxChange = (department: Department) => {
    const allSubDeptsSelected = department.sub_departments.every((subDept) =>
      selectedItems.includes(subDept)
    );

    if (allSubDeptsSelected) {
      // If all sub-departments are selected, unselect the department and its sub-departments
      setSelectedItems((prevSelected) =>
        prevSelected.filter(
          (item) => !department.sub_departments.includes(item) && item !== department.department
        )
      );
    } else {
      // If any sub-department is not selected, select the department and all its sub-departments
      setSelectedItems((prevSelected) => [
        ...prevSelected,
        department.department,
        ...department.sub_departments,
      ]);
    }
  };

  const handleSubDeptCheckboxChange = (subDept: string, department: Department) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(subDept)
        ? prevSelected.filter((item) => item !== subDept)
        : [...prevSelected, subDept]
    );

    const allSubDeptsSelected = department.sub_departments.every((subDept) =>
      selectedItems.includes(subDept)
    );
    
    if (allSubDeptsSelected) {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== department.department)
      );
    } else if (!selectedItems.includes(department.department)) {
      setSelectedItems((prevSelected) => [...prevSelected, department.department]);
    }
  };

  const isDepartmentSelected = (department: Department) => {
    return department.sub_departments.every((subDept) => selectedItems.includes(subDept));
  };

  const isDepartmentExpanded = (department: Department) => {
    return expandedDepartments.includes(department.department);
  };

  const toggleDepartmentExpansion = (department: Department) => {
    // Toggle the department's expanded state
    setExpandedDepartments((prevExpanded) =>
      prevExpanded.includes(department.department)
        ? prevExpanded.filter((dept) => dept !== department.department)
        : [...prevExpanded, department.department]
    );
  };

  return (
    <Box sx={{
      height: 'auto',
      width: '200px',
    
      marginTop: '20px',
  }}>
    <List>
      {data.map((department) => (
        <React.Fragment key={department.department}>
          <ListItem disableGutters>
            <Checkbox
              checked={isDepartmentSelected(department)}
              indeterminate={
                department.sub_departments.some((subDept) => selectedItems.includes(subDept)) &&
                !selectedItems.includes(department.department)
              }
              onChange={() => handleDepartmentCheckboxChange(department)}
            />
            <ListItemText
              primary={department.department}
              onClick={(event) => {
                event.preventDefault();
                toggleDepartmentExpansion(department);
              }}
              style={{ cursor: 'pointer' }}
            />
          </ListItem>
          <Collapse in={isDepartmentExpanded(department)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.sub_departments.map((subDept, index) => (
                <ListItem key={index} >
                  <Checkbox
                    checked={selectedItems.includes(subDept)}
                    onChange={() => handleSubDeptCheckboxChange(subDept, department)}
                  />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
    </Box>
  );
};

export default SecondPageComponent2;
