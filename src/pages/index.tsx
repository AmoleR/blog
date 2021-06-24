import type { ReactNode } from "react";
import type { LayoutElement } from "../next-types";

const Index: LayoutElement<{}> = () => <div>Hi</div>;

const getLayout = (page: ReactNode) => page;
Index.getLayout = getLayout;

export default Index;
