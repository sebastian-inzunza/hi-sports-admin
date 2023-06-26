import {
  useModalAction,
  useModalState,
} from "@/components/ui/modal/modal.context";
import ConfirmationCard from "../common/confirmation-card";

const StoreNoticeDeleteView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();

  function handleDelete() {
    closeModal();
  }

  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={false}
    />
  );
};

export default StoreNoticeDeleteView;
