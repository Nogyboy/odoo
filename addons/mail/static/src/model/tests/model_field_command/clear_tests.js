/** @odoo-module **/

import { clear, insertAndReplace } from '@mail/model/model_field_command';
import {
    beforeEach,
    start,
} from '@mail/utils/test_utils';

QUnit.module('mail', {}, function () {
QUnit.module('model', {}, function () {
QUnit.module('model_field_command', {}, function () {
QUnit.module('clear_tests.js', {
    async beforeEach() {
        await beforeEach(this);
    },
});
QUnit.test('clear: should set attribute field undefined if there is no default value', async function (assert) {
    assert.expect(1);

    const { messaging } = await start({ data: this.data });
    const task = messaging.models['TestTask'].create({
        id: 1,
        title: 'test title 1',
    });
    task.update({ title: clear() });
    assert.strictEqual(
        task.title,
        undefined,
        'clear: should set attribute field undefined if there is no default value'
    );
});

QUnit.test('clear: should set attribute field the default value', async function (assert) {
    assert.expect(1);

    const { messaging } = await start({ data: this.data });
    const task = messaging.models['TestTask'].create({
        id: 1,
        difficulty: 5,
    });
    task.update({ difficulty: clear() });
    assert.strictEqual(
        task.difficulty,
        1,
        'clear: should set attribute field the default value'
    );
});

QUnit.test('clear: should set x2one field undefined if no default value is given', async function (assert) {
    assert.expect(2);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({
        id: 10,
        address: insertAndReplace({ id: 20 }),
    });
    const address = messaging.models['TestAddress'].findFromIdentifyingData({ id: 20 });
    contact.update({ address: clear() });
    assert.strictEqual(
        contact.address,
        undefined,
        'clear: should set x2one field undefined'
    );
    assert.strictEqual(
        address.contact,
        undefined,
        'the inverse relation should be cleared as well'
    );
});

QUnit.test('clear: should set x2one field the default value', async function (assert) {
    assert.expect(1);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({
        favorite: insertAndReplace({ description: 'pingpong' }),
        id: 10,
    });
    contact.update({ favorite: clear() });
    assert.strictEqual(
        contact.favorite.description,
        'football',
        'clear: should set x2one field default value'
    );
});

QUnit.test('clear: should set x2many field empty array if no default value is given', async function (assert) {
    assert.expect(2);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({
        id: 10,
        tasks: insertAndReplace({ id: 20 }),
    });
    const task = messaging.models['TestTask'].findFromIdentifyingData({ id: 20 });
    contact.update({ tasks: clear() });
    assert.ok(
        contact.tasks instanceof Array &&
        contact.tasks.length === 0,
        'clear: should set x2many field empty array'
    );
    assert.strictEqual(
        task.responsible,
        undefined,
        'the inverse relation should be cleared as well'
    );
});

QUnit.test('clear: should set x2many field the default value', async function (assert) {
    assert.expect(1);
    const { messaging } = await start({ data: this.data });

    const contact = messaging.models['TestContact'].create({
        id: 10,
        hobbies: [
            insertAndReplace({ description: 'basketball' }),
            insertAndReplace({ description: 'running' }),
            insertAndReplace({ description: 'photographing' }),
        ],
    });
    contact.update({ hobbies: clear() });
    const hobbyDescriptions = contact.hobbies.map(h => h.description);
    assert.deepEqual(
        hobbyDescriptions,
        ['hiking', 'fishing'],
        'clear: should set x2many field the default value',
    );
});

});
});
});
