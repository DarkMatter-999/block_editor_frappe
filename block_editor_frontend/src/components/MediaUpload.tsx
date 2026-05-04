import { addFilter } from "@wordpress/hooks";
import { useState } from "@wordpress/element";
import { MediaLibrary } from "./MediaLibrary";

export const MediaUpload = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {props.render({
        open: () => setIsModalOpen(true),
      })}
      {isModalOpen && (
        <MediaLibrary
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSelect={props.onSelect}
          multiple={props.multiple}
          docName={props.docName}
          allowedTypes={props.allowedTypes}
        />
      )}
    </>
  );
};

addFilter(
  "editor.MediaUpload",
  "frappe-gutenberg/media-upload",
  () => MediaUpload,
);
