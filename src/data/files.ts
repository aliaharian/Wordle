export type File = {
  name: string;
  children?: File[];
};
const files: File = {
  name: "Root",
  children: [
    {
      name: "Folder1",
      children: [
        {
          name: "Subfolder1",
          children: [
            {
              name: "File1.txt",
            },
            {
              name: "File2.txt",
            },
          ],
        },
        {
          name: "Subfolder2",
          children: [
            {
              name: "File3.txt",
            },
            {
              name: "File4.txt",
              children: [
                {
                  name: "File3.txt",
                  children: [
                    {
                      name: "File3.txt",
                    },
                    {
                      name: "File4.txt",
                    },
                  ],
                },
                {
                  name: "File4.txt",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Folder2",
      children: [
        {
          name: "Subfolder3",
          children: [
            {
              name: "File5.txt",
            },
            {
              name: "File6.txt",
            },
          ],
        },
        {
          name: "Subfolder4",
          children: [
            {
              name: "File7.txt",
            },
            {
              name: "File8.txt",
            },
          ],
        },
      ],
    },
  ],
};

export default { files };
