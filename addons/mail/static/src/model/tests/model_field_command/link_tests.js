/** @odoo-module **/

import { insertAndReplace, link } from '@mail/model/model_field_command';
import {
    beforeEach,
    start,
} from '@mail/utils/test_utils';

QUnit.module('mail', {}, function () {
QUnit.module('model', {}, function () {
QUnit.module('model_field_command', {}, function () {
QUnit.module('field_command_link_tests.js', {
    async beforeEach() {
        await beforeEach(this);
    },
});

QUnit.test('link: should link a record to an empty x2one field', async function (assert) {
    assert.expect(2);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({ id: 10 });
    const address = messaging.models['TestAddress'].create({ id: 10 });
    contact.update({ address: link(address) });
    assert.strictEqual(
        contact.address,
        address,
        'link: should link a record to an empty x2one field'
    );
    assert.strictEqual(
        address.contact,
        contact,
        'the inverse relation should be set as well'
    );
});

QUnit.test('link: should replace a record to a non-empty x2one field', async function (assert) {
    assert.expect(3);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({
        id: 10,
        address: insertAndReplace({ id: 10 }),
    });
    const address10 = messaging.models['TestAddress'].findFromIdentifyingData({ id: 10 });
    const address20 = messaging.models['TestAddress'].create({ id: 20 });
    contact.update({ address: link(address20) });
    assert.strictEqual(
        contact.address,
        address20,
        'link: should replace a record to a non-empty x2one field'
    );
    assert.strictEqual(
        address20.contact,
        contact,
        'the inverse relation should be set as well'
    );
    assert.strictEqual(
        address10.contact,
        undefined,
        'the orginal relation should be dropped'
    );
});

QUnit.test('link: should link a record to an empty x2many field', async function (assert) {
    assert.expect(3);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({ id: 10 });
    const task = messaging.models['TestTask'].create({ id: 10 });
    contact.update({ tasks: link(task) });
    assert.strictEqual(
        contact.tasks.length,
        1,
        "should have 1 record"
    );
    assert.strictEqual(
        contact.tasks[0],
        task,
        'the record should be linked'
    );
    assert.strictEqual(
        task.responsible,
        contact,
        'the inverse relation should be set as well'
    );
});

QUnit.test('link: should link and add a record to a non-empty x2many field', async function (assert) {
    assert.expect(5);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({
        id: 10,
        tasks: insertAndReplace({ id: 10 }),
    });
    const task10 = messaging.models['TestTask'].findFromIdentifyingData({ id: 10 });
    const task20 = messaging.models['TestTask'].create({ id: 20 });
    contact.update({ tasks: link(task20) });
    assert.strictEqual(
        contact.tasks.length,
        2,
        "should have 2 records"
    );
    assert.strictEqual(
        contact.tasks[0],
        task10,
        "the original record should be kept"
    );
    assert.strictEqual(
        contact.tasks[1],
        task20,
        "the new record should be added"
    );
    assert.ok(
        contact.tasks instanceof Array &&
        contact.tasks.length === 2 &&
        contact.tasks.includes(task10) &&
        contact.tasks.includes(task20),
        'link: should link and add a record to a non-empty x2many field',
    );
    assert.strictEqual(
        task20.responsible,
        contact,
        'the inverse relation should be set as well'
    );
});

});
});
});
