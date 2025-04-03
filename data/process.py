import pandas as pd
import os

folder_path = "uniclass"
output_file = "data.txt"

with open(output_file, "w") as file:
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".xlsx") or file_name.endswith(".xls"):
            file_path = os.path.join(folder_path, file_name)

            df = pd.read_excel(file_path)

            cell_value = df.columns[0]

            first_part = cell_value.split("-", 1)[0].rstrip()
            modified_text = first_part.replace(" ", "\t", 1)
            file.write(f"{modified_text}\n")

            df = pd.read_excel(file_path, skiprows=2)

            for index, row in df.iterrows():
                col1 = str(row.iloc[0])
                col7 = str(row.iloc[6])
                file.write(f"{col1}\t{col7}\n")


# Remove trailing newline
with open(output_file, "r") as file:
    content = file.read()

content = content.rstrip("\n")

with open(output_file, "w") as file:
    file.write(content)
