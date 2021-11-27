import React from 'react';

const Modal = () => {
	return <div>
		<div className="modal fade" id="yesNoModal" tabindex="-1" aria-labelledby="yesNoModalLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="yesNoModalLabel">¿Esta seguro que desea eliminar?</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						...
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
						<button type="button" className="btn btn-primary">Si</button>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default Modal;