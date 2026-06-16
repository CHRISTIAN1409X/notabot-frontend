import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PdfViewerMock from "../components/PdfViewerMock";
import ReviewAiPanel from "../components/ReviewAiPanel";
import {
  approveReview,
  fetchReviewDetail,
  sendObservations,
} from "../services/api";

export default function ReviewDetail() {
  const navigate = useNavigate();

  // ESTA LINEA TE FALTA
  const { id } = useParams();

  const [review, setReview] = useState(null);
  const [decision, setDecision] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviewDetail(id).then(setReview);
  }, [id]);

  const runDecision = async (action) => {
    setIsSubmitting(true);

    const response =
      action === "approve"
        ? await approveReview(id)
        : await sendObservations(id);

    setDecision(response);

    setIsSubmitting(false);

    if (action === "approve") {
      navigate("/history");
    } else {
      navigate("/procesos");
    }
  };

  if (!review) {
    return (
      <div className="panel p-6 text-muted">
        Cargando detalle de revision...
      </div>
    );
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_520px]">
      <PdfViewerMock review={review} />

      <ReviewAiPanel
        decision={decision}
        isSubmitting={isSubmitting}
        review={review}
        onApprove={() => runDecision("approve")}
        onSendObservations={() => runDecision("observations")}
      />
    </div>
  );
}