import { useContext } from "react";
import { EventListContext } from "./EventListContext.js";

function EventForm() {
  const { handlerMap } = useContext(EventListContext);

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1">
      <form
        id="eventForm"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = new FormData(e.target);
          handlerMap.handleCreate(Object.fromEntries(formData));
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Vytvořit událost
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Datum konání
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  name="date"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Název události
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Zavřít
              </button>
              <button type="submit" className="btn btn-primary">
                Vytvořit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function resetForm() {
  document.getElementById("eventForm").reset();
}

function closeModal() {
  console.log(document.getElementById("exampleModal"));
}

export default EventForm;
