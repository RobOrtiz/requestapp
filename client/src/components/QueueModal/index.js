import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './styles.css'


function QueueModal(props) {

    return(
        <div className="modal fade" id="queueModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">SONGS IN QUEUE</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    <div className="modal-body text-center">
                        <DragDropContext onDragEnd={props.handleOnDragEnd}>
                        <Droppable droppableId="queue-modal-songs">
                        {(provided) => (
                            <ul className="list-unstyled modal-body text-center queue-modal-songs" {...provided.droppableProps} ref={provided.innerRef}>
                            {props.songs.map((song, index) => {
                                return (
                                    <Draggable key={song._id} draggableId={song._id} index={index}>
                                        {(provided) => (
                                            <li className="card flex-row queue-modal-card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <img src={song.albumCover} alt={song.title} className="card-img queue-modal-image"/>
                                            <h5 className="font-italic ml-3 mr-2">{song.title} &#183; {song.artist}</h5>
                                            <span className="ml-auto mr-3">Tipped: ${song.tip}</span>
                                        </li>
                                        )}
                                    </Draggable>
                                )
                            })
                            }
                            {provided.placeholder}
                            </ul>
                        )}
                        </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueueModal;