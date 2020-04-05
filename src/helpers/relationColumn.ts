import { Column, ColumnOptions } from "typeorm";

function relationColumn(options?: ColumnOptions) {
    return Column({ nullable: true, ...options });
}

export default relationColumn;
