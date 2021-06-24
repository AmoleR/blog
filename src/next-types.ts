import type { FC, ReactNode } from "react";
import type { NextPage } from "next";

type LayoutElement<P = {}> = FC<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type NextLayoutPage = NextPage & { getLayout?: (page: ReactNode) => ReactNode };

export type { LayoutElement, NextLayoutPage };
