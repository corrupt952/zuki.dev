import { Heading } from "@/components/Typography";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

type Certification = {
  name: string;
  acquiredDate: Date;
};

const certifications: Certification[] = [
  {
    name: "Fundamental Information Technology Engineer Examination",
    acquiredDate: new Date(2012, 4, 1),
  },
  {
    name: "Applied Information Technology Engineer Examination",
    acquiredDate: new Date(2012, 11, 1),
  },
  {
    name: "Information Security Specialist Examination",
    acquiredDate: new Date(2013, 5, 1),
  },
];

export const CertificationArea = () => {
  return (
    <>
      <Heading>Certification</Heading>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Acquired Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certifications.map((certification) => (
            <TableRow key={certification.name}>
              <TableCell>{certification.name}</TableCell>
              <TableCell align="right">
                {certification.acquiredDate.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
