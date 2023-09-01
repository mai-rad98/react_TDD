import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function SummaryForm({ setOrderPhase }) { // Notice the change here: { setOrderPhase }

    const [isChecked, setIsChecked] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        // pass along to the next phase
        // the next page will handle submitting order from context
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id='popover-basic'>
            <Popover.Body>
            No ice cream will actually be delivered
            </Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to{' '}
            <OverlayTrigger placement='right' overlay={popover}>
                <span style={{ color: 'blue' }}> Terms and conditions </span>
            </OverlayTrigger>
        </span>
    );

    return (
        <Form onSubmit={handleSubmit}> {/* Added onSubmit handler */}
            <Form.Group controlId='terms-and-conditions'>
                <Form.Check
                    type='checkbox'
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant='primary' type='submit' disabled={!isChecked}>
                Confirm Order
            </Button>
        </Form>
    );
}