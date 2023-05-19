import React, { useState } from 'react';
import { Checkbox, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const DepartmentList = () => {
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({});

  const departments: {
    id: number;
    name: string;
    subDepartments: { id: number; name: string }[];
  }[] = [
    {
      id: 1,
      name: 'Department 1',
      subDepartments: [
        { id: 1, name: 'Sub-Department 1.1' },
        { id: 2, name: 'Sub-Department 1.2' },
        { id: 3, name: 'Sub-Department 1.3' },
        { id: 4, name: 'Sub-Department 1.4' },
        { id: 5, name: 'Sub-Department 1.5' },

      ],
    },
  ];

  const handleCollapseToggle = (departmentId: number) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [departmentId]: !prevOpen[departmentId],
    }));
  };

  const handleCheckboxChange = (departmentId: number, subDepartmentId?: number) => {
    setChecked((prevChecked) => {
      const updatedChecked = {
        ...prevChecked,
        [departmentId]: !prevChecked[departmentId],
      };
  
      const department = departments.find((dep) => dep.id === departmentId);
      if (department) {
        if (subDepartmentId) {
          updatedChecked[subDepartmentId] = !prevChecked[subDepartmentId];
        } else {
          updatedChecked[departmentId] = !prevChecked[departmentId];
          department.subDepartments.forEach((subDep) => {
            updatedChecked[subDep.id] = updatedChecked[departmentId];
          });
        }
  
        const parentDepartment = departments.find((dep) =>
          dep.subDepartments.some((subDep) => subDep.id === departmentId)
        );
        if (parentDepartment) {
          const allParentSubDepartmentsChecked = parentDepartment.subDepartments.every(
            (subDep) => updatedChecked[subDep.id]
          );
  
          updatedChecked[parentDepartment.id] = allParentSubDepartmentsChecked;
        }
      }
  
      return updatedChecked;
    });
  };
  

  return (
    <List>
      {departments.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleCollapseToggle(department.id)}>
              <Checkbox
                checked={checked[department.id]}
                indeterminate={
                  department.subDepartments.length > 0 &&
                  department.subDepartments.some((subDepartment) => checked[subDepartment.id])
                }
                onChange={() => handleCheckboxChange(department.id)}
              />
              <ListItemText primary={department.name} />
            </ListItemButton>
          </ListItem>
          {department.subDepartments.length > 0 && (
            <Collapse in={open[department.id]} timeout="auto" unmountOnExit>
              <List sx={{ paddingLeft: '20px' }}>
                {department.subDepartments.map((subDepartment) => (
                  <ListItem key={subDepartment.id} disablePadding>
                    <ListItemButton>
                      <Checkbox
                        checked={checked[subDepartment.id]}
                        onChange={() => handleCheckboxChange(department.id, subDepartment.id)}
                      />
                      <ListItemText primary={subDepartment.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
