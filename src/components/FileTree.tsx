import files, { File } from "../data/files";

const filesList = files.files;

const Entry = ({ files, depth }: { files: File; depth: number }) => {
  console.log("files", files);
  return (
    <div style={{ borderLeft: "2px solid black" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ height: 1, width: 25, background: "black" }} />
        <p style={{ marginLeft: 2 }}>{files.name}</p>
      </div>
      {files.children?.map((item, index) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{ height: 1, width: 25, background: "black" }}
            />
            <Entry depth={depth + 1} files={item} key={index} />
          </div>
        );
      })}
    </div>
  );
};
const FileTree = () => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h1 style={{ fontSize: 30 }}>file tree</h1>
      <div>
        <p>{filesList.name}</p>
        {filesList.children?.map((item, index) => {
          return (
            <div
              style={{ display: "flex", alignItems: "center", marginLeft: 15 }}
            >
              <Entry depth={1} files={item} key={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FileTree;
