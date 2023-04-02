import { Heading } from "@/components/Typography";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useTranslation } from "@/libs/i18n";
import React from "react";

type Certification = {
  name: string;
  date: string;
};

export const CertificationArea = () => {
  const { t } = useTranslation("pages.about.certification");
  const certifications = t("certifications", {
    returnObjects: true,
  }) as Certification[];

  return (
    <>
      <Heading>{t("title")}</Heading>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("thead.name")}</TableCell>
            <TableCell align="right">
              <span>{t("thead.date")}</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {certifications.map((certification) => (
            <TableRow key={certification.name}>
              <TableCell>{certification.name}</TableCell>
              <TableCell align="right">{certification.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
