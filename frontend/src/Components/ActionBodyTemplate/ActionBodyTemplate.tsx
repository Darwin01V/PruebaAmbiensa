import { Button } from "primereact/button";


interface ActionBodyTemplateProps {
    rowData: any;
    iconEdit?: string;
    iconDelete?: string;
    onEdit?: (id: number | string) => void;
    onDelete?: (id: number) => void;
    onCustomAction?: (id: number) => void;
  }

const ActionBodyTemplate = ({ rowData, onEdit, onDelete, onCustomAction, iconEdit = 'pi-pencil', iconDelete = 'pi-trash'  }: ActionBodyTemplateProps) => {
    const IDs = rowData?.id ?? 0;
    return (
      <div className="flex gap-2 justify-content-center">
        {onEdit && (
          <Button
            icon={`pi ${iconEdit}`}
            className="p-button p-button-sm p-button-text p-button-info w-2rem h-2rem m-0 p-0 bg-blue-100"
            onClick={() => onEdit(rowData)}
          />
        )}
        {onDelete && (
          <Button
            icon={`pi ${iconDelete}`}
            className="p-button p-button-sm p-button-text p-button-danger w-2rem h-2rem m-0 p-0 bg-red-100"
            onClick={() => onDelete(IDs)}
          />
        )}

        {onCustomAction && (
          <Button
            label="Acción Personalizada"
            icon="pi pi-cog"
            className="p-button p-button-sm p-button-text p-button-warning w-2rem h-2rem m-0 p-0"
            onClick={() => onCustomAction(IDs)}
          />
        )}
      </div>
    );
  };

export default ActionBodyTemplate;
